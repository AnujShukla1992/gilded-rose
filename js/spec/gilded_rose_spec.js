

/* Requirements 
 - Add new feature to sell new category of items

 "Conjured" items degrade in Quality twice as fast as normal items
  change in qualtiy = 2X

  ITEMS:
  1. Aged Brie
  2. Backstage passes to a TAFKAL80ETC concert
  3. Sulfuras, Hand of Ragnaros
  4. Conjured
  */


/* Boundary Conditions
- All items have a SellIn value which denotes the number of days we have to sell the item
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

- Once the sell by date has passed, Quality degrades twice as fast
  date > sell by date ; change in qualtiy = 2X

The Quality of an item is never negative, The Quality of an item is never more than 50
  qulaity [0, 50]

ITEM: Aged Brie     
"Aged Brie" actually increases in Quality the older it gets
  date ~ sell by date ; quality increases

ITEM: Backstage passes   
"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
  date ~ sell by date ; quality increases

Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but  
  date [(sell by date - 10), (sell by date - 5)] ; quality = quality + 2
  date [(sell by date - 5), sell by date] ; quality = quality + 3
Quality drops to 0 after the concert
  date > sell by date ; quality = 0

an item can never have its Quality increase above 50
  Quality !> 50

"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
"Sulfuras" is a legendary item and as such its Quality is 80 and it never alters.
Sulfuras: {
  this.name = Sulfuras;
  this.sell_in = NA;
  this.quality = 80;
}
*/


describe("Gilded Rose", function() {

  // Item: All
  it("should have correct item object", function() {
    items = [ new Item("foo", 0, 80) ];
    update_quality();
    expect(typeof(items[0].name)).toEqual("string");
    expect(typeof(items[0].sell_in)).toEqual("number");
    expect(typeof(items[0].quality)).toEqual("number");
  });

  it("should have item quality not more than 50", function() {
    items = [ new Item("foo", 0, 50) ];
    update_quality();
    expect(items[0].quality <= 50).toBeTruthy();
  });


/* 
  ITEM: Aged Brie     
  "Aged Brie" actually increases in Quality the older it gets
    date ~ sell by date ; quality increases
*/

it("should have Aged Brie item quality increase by 1 when sell_in is equal to 10", function() {
  items = [ new Item("Aged Brie", 10, 30) ];
  update_quality();
  expect(items[0].quality).toEqual(31);
  expect(items[0].sell_in).toEqual(9);
});

it("should have Aged Brie item quality increase by 1 when sell_in is equal to 1", function() {
  items = [ new Item("Aged Brie", 1, 30) ];
  update_quality();
  expect(items[0].quality).toEqual(31);
  expect(items[0].sell_in).toEqual(0);
});

it("should have Aged Brie item quality increase by 1 when sell_in is equal to -1", function() {
  items = [ new Item("Aged Brie", -1, 30) ];
  update_quality();
  expect(items[0].quality).toEqual(32);
  expect(items[0].sell_in).toEqual(-2);
});

it("should not have Aged Brie item quality increase by 1 when when qualtiy is 50", function() {
  items = [ new Item("Aged Brie", -1, 50) ];
  update_quality();
  expect(items[0].quality).toEqual(50);
  expect(items[0].sell_in).toEqual(-2);
});

  
/*
  ITEM: Backstage passes
  Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but  
    date [(sell by date - 10), (sell by date - 5)] ; quality = quality + 2
    date [(sell by date - 5), sell by date] ; quality = quality + 3
  Quality drops to 0 after the concert
    date > sell by date ; quality = 0
  */

  it("should have Backstage passes item quality equal to 0 when sell_in is equal to 0", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30) ];
    update_quality();
    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(-1);
  });

  it("should have Backstage passes item quality increase by 2 when sell_in is equal to 10", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30) ];
    update_quality();
    expect(items[0].quality).toEqual(32);
    expect(items[0].sell_in).toEqual(9);
  });

  it("should have Backstage passes item quality increase by 2 when sell_in is less than 10 but greater than 5", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 6, 30) ];
    update_quality();
    expect(items[0].quality).toEqual(32);
    expect(items[0].sell_in).toEqual(5);
  });

  it("should have Backstage passes item quality increase to 50 when qualtiy is 49 sell_in is less than 10 but greater than 5", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 6, 49) ];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(5);
  });

  it("should not have Backstage passes item quality increase when qualtiy is 50 sell_in is less than 10 but greater than 5", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 6, 50) ];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(5);
  });

  it("should have Backstage passes item quality increase by 3 when sell_in is equal to 5", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30) ];
    update_quality();
    expect(items[0].quality).toEqual(33);
    expect(items[0].sell_in).toEqual(4);
  });

  it("should have Backstage passes item quality increase by 3 when sell_in is less than 5", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 1, 30) ];
    update_quality();
    expect(items[0].quality).toEqual(33);
    expect(items[0].sell_in).toEqual(0);
  });

  it("should have Backstage passes item quality increase to 50 when when qualtiy is 48 sell_in is less than 5", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 1, 48) ];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(0);
  });

  it("should not have Backstage passes item quality increase by 3 when quality is 50 sell_in is less than 5", function() {
    items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50) ];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(0);
  });


  // Item: Sulfuras

  it("should have Sulfuras item name as Sulfuras", function() {
    items = [ new Item("Sulfuras", 0, 80) ];
    update_quality();
    expect(items[0].name).toEqual("Sulfuras");
  });

  it("should have Sulfuras item quality and sell_in not change", function() {
    items = [ new Item("Sulfuras, Hand of Ragnaros", 10, 80) ];
    update_quality();
    expect(items[0].quality).toEqual(80);
    expect(items[0].sell_in).toEqual(10);
  });

  // it("should have Sulfuras item sell_in not change", function() {
  //   items = [ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ];
  //   update_quality();
  //   expect(items[0].sell_in).toEqual(0);
  // });
  
  // it("should not have Sulfuras item quality other than 80", function() {
  //   items = [ new Item("foo", 0, 80) ];
  //   update_quality();
  //   expect(items[0].quality ).toEqual(80);
  // });
});

