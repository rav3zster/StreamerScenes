import type { Command, CommandType, CommandPayloadMap } from './types';

export class CommandBus {
  private handlers = new Map<string, Array<(payload: any) => void>>();

  /**
   * Register a handler for a specific command type
   */
  register<T extends CommandType>(
    type: T,
    handler: (payload: CommandPayloadMap[T]) => void
  ): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type)!.push(handler);

    // Return unregister function
    return () => {
      const list = this.handlers.get(type);
      if (list) {
        this.handlers.set(type, list.filter(h => h !== handler));
      }
    };
  }

  /**
   * Dispatch a command to all registered handlers
   */
  dispatch(command: Command): void {
    const list = this.handlers.get(command.type);
    if (list) {
      list.forEach(handler => {
        try {
          handler(command.payload);
        } catch (e) {
          console.error(`Error executing command ${command.type}:`, e);
        }
      });
    } else {
      console.warn(`No handler registered for command: ${command.type}`);
    }
  }
}

// Export singleton instance for global use
export const commandBus = new CommandBus();
export default commandBus;
