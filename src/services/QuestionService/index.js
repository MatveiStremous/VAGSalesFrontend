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
}

const questionService = new QuestionService();
export default questionService;