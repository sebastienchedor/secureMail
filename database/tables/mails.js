module.exports = makeTable;

function makeTable(dbModel, dbInstance) {
    return dbInstance.define('mails', {
        id: {
            type: dbModel.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender: {
            type: dbModel.STRING
        },
        recipient: {
            type: dbModel.STRING
        },
        verify: {
            type: dbModel.STRING
        },
        subject: {
            type: dbModel.STRING
        },
        content: {
            type: dbModel.TEXT,
        },
    },
    {
        timestamps: false
    });
}
