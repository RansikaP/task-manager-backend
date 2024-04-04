const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// const taskSchema = new Schema({
//     taskId: { type: String, required: true },
//     name: { type: String, required: true },
//     description: { type: String },
// });

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    creator: { type: String, required: true},
    description: { type: String },
    collaborators: [{ type: String }]
},
{ collection: 'project-data' }
);


const ProjectModel = model('Project', ProjectSchema);

module.exports =ProjectModel;