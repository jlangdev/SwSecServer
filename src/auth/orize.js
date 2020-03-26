const authorize2 = (req, res, next) => {

let _id = req.params.id

    try {
        let user = User.findOne({ _id: _id })
            .then((err, doc) => {
                if (err) {
                    res.status(500).json({
                        err: err
                    });
                    console.log(`Error getting newest message for user:\n ${username}\n${err}`);
                }else{
                    return doc;
                }

            });

        if (username != user.username) {
            res.status(403).send();
        }
    } catch (err) {
        console.log(err)
    }
    next
}
module.exports = authorize2;
