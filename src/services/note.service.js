import api from './api';

class NoteService {
  getNewReceiveNote() {
    return api.get('/note/newreceivenote');
  }
}

export default new NoteService();
