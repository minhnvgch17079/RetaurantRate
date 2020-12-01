var databaseHandler = {
    db: null,

    createDatabase: function () {
        this.db = window.openDatabase("restaurant_rating.db", "1.0", "restaurant_rating", 2 * 1024 * 1024)

        this.db.transaction (
            function (tx) {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS restaurant_rating (id INTEGER PRIMARY KEY AUTOINCREMENT,res_type TEXT NOT NULL, name TEXT NOT NULL , date_visit DATE NOT NULL, avg_price INTEGER NOT NULL, service_rating INTEGER NOT NULL, cleanliness_rating INTEGER NOT NULL, food_rating INTEGER NOT NULL, cus_note TEXT, cus_name TEXT NOT NULL )",
                    [],
                    function (tx, result) {},
                    function (tx, error) {
                        console.log('Error when create table')
                    },
                    function () {
                        console.log('Create success')
                    }
                )
            },
            // Error when connect
            function (err) {
                alert('Error when connect to database')
            },
            // Success connect
            function () {
                console.log('Success')
            }
        )
    }
}