var restaurantRating = {

    addRating: function (name, res_type, date_visit, avg_price_person, service_rating, cleanliness_rating, food_rating, cus_not, cus_name) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "INSERT INTO restaurant_rating (name, res_type, date_visit, avg_price, service_rating, cleanliness_rating, food_rating, cus_note, cus_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [name, res_type, date_visit, avg_price_person, service_rating, cleanliness_rating, food_rating, cus_not, cus_name],
                    function (tx, result) {
                        return true
                    },
                    function (tx, error) {
                        alertError('Add product error: ' + error.message)
                    }
                )
            },
            function (error) {},
            function () {}
        )
    },

    getRating: function (page, limit) {
        page = page - 1
        databaseHandler.db.readTransaction(
            function (tx) {
                tx.executeSql(
                    "SELECT * FROM restaurant_rating LIMIT " + page + "," + limit,
                    [],
                    function (tx, result) {
                        showProduct(result)
                    },
                    function (tx, error) {
                        console.log('Error when get rating: ' + error.message)
                    }
                )
            }
        )
    },

    getRatingByConditions: function (conditions) {
        let sql     = "SELECT * FROM restaurant_rating"
        let flag    = true
        for (const [key, value] of Object.entries(conditions)) {
            if (value.length > 0) {
                if (flag === true) {
                    sql += ` WHERE ${key} = "${value}"`
                    flag = false
                } else {
                    sql += ` AND ${key} = "${value}"`
                }
            }
        }

        databaseHandler.db.readTransaction(
            function (tx) {
                tx.executeSql(
                    sql,
                    [],
                    function (tx, result) {
                        refreshContent(false)
                        showProduct(result)
                    },
                    function (tx, error) {
                        console.log('Error when get rating: ' + error.message)
                    }
                )
            }
        )
    },

    removeRating: function (idRating) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "DELETE FROM restaurant_rating WHERE id = " + idRating,
                    [],
                    function (tx, result) {
                        refreshContent()
                    },
                    function (tx, error) {
                        console.log('Error remove rating: ' + error.message)
                    }
                )
            }
        )
    }
}