import axios from "axios";
const url = "http://localhost:7070";

class QuestionService {
    getAllQuestions() {
        return axios.get(url + "/questions");
    };

    addNewQuestion(question) {
        return axios.post(url + "/question", question);
    }

    answerToMessage(question) {
        return axios.post(url + "/answer", question);
    }

    deleteQuestion(id) {
        return axios.delete(url + "/answer/" + id);
    }
}

const questionService = new QuestionService();
export default questionService;