const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    if (req.body.username.length < 4 || req.body.password.length < 4) {
        res.status(401);
        return res.send({
            error: { message: new Error("password or username is incorrect"), status: 401 },
        });
    }
    const user_id = getId(body.)
});

module.exports = router;
