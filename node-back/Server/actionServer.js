import express from 'express';


const app = express();
const router = express.Router();


router.route('/back-issues/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});