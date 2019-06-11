const db = require('../model/user');

const getDtl = (req, res) => {
    //db is used to connect the database
    //find method get the all collection details 
    db.user.find({}, (err, result) => {
        res.json(result);
    })
};
const getID = (req, res) => {
    if (req.query.projectId) {

        db.user.find({ projectId: req.query.projectId }, (err, result) => {

            if (!result.length > 0) {
                res.status(404).send('the given id is not found');
            }
            else {
                res.json(result);
            };
        });
    }
    else if (req.query.projectManager) {
        db.user.find({ projectManager: req.query.projectManager }, (err, result) => {

            if (!result.length > 0) {
                res.status(404).send('the given id is not found');
            }
            else {
                res.json(result);
            };
        });
    }
    else if (req.query.projectName) {
        db.user.find({ projectName: req.query.projectName }, (err, result) => {

            if (!result.length > 0) {
                res.status(404).send('the given id is not found');
            }
            else {
                res.json(result);
            };
        });
    }
}

const postDtl = (req, res) => {
    //create method insert the details to the collection
    db.user.create({
        projectId: req.body.projectId,
        projectName: req.body.projectName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        projectDuration: req.body.projectDuration,
        totalProjectHours: req.body.totalProjectHours,
        projectManager: req.body.projectManager,
        projectDesc: req.body.projectDesc
    }, (err, result) => {
        if (!result) {
            res.status(404).send('enter vaild id & this Id is already use');
        }
        else {
            res.json(result);
        }
    })
};
const putDtl = (req, res) => {
    if (req.query.projectId) {
        let data = {
            $set: {
                projectName: req.body.projectName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                projectDuration: req.body.projectDuration,
                totalProjectHours: req.body.totalProjectHours,
                projectManager: req.body.projectManager,
                projectDesc: req.body.projectDesc
            }
        };
        //this details will update in particular id
        //updateOne method used to update data
        db.user.updateOne({ projectId: req.query.projectId }, data, (err, result) => {
            if (result.nModified == 0) {
                res.status(404).send('Id not found & Enter the Vaild Id to update...');
            } else {
                res.status(200);
                res.json(result);
            };
        });
    }
    else if (req.query.projectManager) {
        //convert incoming id string to number
        let data = {
            $set: {
                projectId: req.body.projectId,
                projectName: req.body.projectName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                projectDuration: req.body.projectDuration,
                totalProjectHours: req.body.totalProjectHours,
                projectDesc: req.body.projectDesc
            }
        };
        //this details will update in particular id
        //updateOne method used to update data
        db.user.updateOne({ projectManager: req.query.projectManager }, data, (err, result) => {
            if (result.nModified == 0) {
                res.status(404).send('Id not found & Enter the Vaild Id to update....');
            } else {
                res.status(200);
                res.json(result);
            };
        });
    }
    else if (req.query.projectName) {
        //convert incoming id string to number
        let data = {
            $set: {
                projectId: req.body.projectId,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                projectDuration: req.body.projectDuration,
                totalProjectHours: req.body.totalProjectHours,
                projectManager: req.body.projectManager,
                projectDesc: req.body.projectDesc
            }
        };
        //this details will update in particular id
        //updateOne method used to update data
        db.user.updateOne({ projectName: req.query.projectName }, data, (err, result) => {
            if (result.nModified == 0) {
                res.status(404).send('Id not found & Enter the Vaild Id to update...');
            } else {
                res.status(200);
                res.json(result);
            };
        });
    }

};
const deleteDtl = (req, res) => {
    if (req.query.projectId) {
        db.user.deleteOne({ projectId: req.query.projectId }, (err, result) => {
            if (result.deletedCount == 0) {
                res.status(404).send('delete the details will error & Enter the Valid Id');
            } else {
                res.status(200);
                res.json(result);
            }
        })
    }
    else if (req.query.projectName) {
        db.user.deleteOne({ projectName: req.query.projectName }, (err, result) => {
            if (result.deletedCount == 0) {
                res.status(404).send('delete the details will error & Enter the Valid Id');
            } else {
                res.status(200);
                res.json(result);
            }
        })
    }
    else if (req.query.projectManager) {
        db.user.deleteOne({ projectManager: req.query.projectManager }, (err, result) => {
            if (result.deletedCount == 0) {
                res.status(404).send('delete the details will error & Enter the Valid Id');
            } else {
                res.status(200);
                res.json(result);
            }
        })
    }
};
db.dbConnect();
module.exports = { getDtl, getID, postDtl, putDtl, deleteDtl };