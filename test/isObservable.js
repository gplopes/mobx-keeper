import { isObservable } from 'mobx';

export default {
  isObservable(received, argument) {
    const pass = isObservable(received, argument);
    if (pass) {
      return {
        message: () => `expected ${argument} from ${received} to be a mobx observable`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${argument} from ${received} to be a mobx observable`,
        pass: false
      };
    }
  }
};
