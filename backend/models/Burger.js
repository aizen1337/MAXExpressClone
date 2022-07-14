class Ingredients {
    constructor(Bacon,Bun,Cheese,Dressing,Extras,Patty,Vegetables) {
        this.Bacon = Bacon,
        this.Bun = Bun,
        this.Cheese = Cheese,
        this.Dressing = Dressing,
        this.Extras = Extras,
        this.Patty = Patty,
        this.Vegetables = Vegetables
    }
};
class Burger {
    constructor(Price,Title,isVegan, Ingredients) {
        this.Price = Price,
        this.Title = Title,
        this.isVegan = isVegan,
        this.Ingredients = Ingredients
    }
}

module.exports = {
    Burger,
    Ingredients
}