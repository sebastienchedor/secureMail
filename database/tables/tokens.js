module.exports = makeTable;

function makeTable(dbModel, dbInstance, tables) {
    return dbInstance.define('tokens', {
        id: {
            type: dbModel.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mailID: {
            type: dbModel.INTEGER,
            references: {
                model: tables.Mails,
                key: 'id'
            }
        },
        token: {
          type: dbModel.STRING
        },
        expire: {
          type: dbModel.BIGINT
        }
    },
    {
        timestamps: false
    });
}
