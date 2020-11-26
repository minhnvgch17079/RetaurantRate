var restaurantRating = {

    addRating: function (name, date_visit, avg_price_person, service_rating, cleanliness_rating, food_rating, cus_not, cus_name) {
        databaseHandler.db.transaction(
            function (tx) {
                tx.executeSql(
                    "INSERT INTO restaurant_rating (name, date_visit, avg_price, service_rating, cleanliness_rating, food_rating, cus_note, cus_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [name, date_visit, avg_price_person, service_rating, cleanliness_rating, food_rating, cus_not, cus_name],
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
    }
}