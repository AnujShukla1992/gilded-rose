describe("Gilded Rose", function () {
  
  // General Item test cases
  it("should have item quality not more than 50 and sell_in reduced by 1", function () {
    items = [new Item("foo", 10, 60)];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(9);
  });

  it("should have item quality not less than 0 and sell_in reduced by 1", function () {
    items = [new Item("foo", 10, 0)];
    update_quality();
    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(9);
  });

  it("should have item quality and sell_in reduced by 2", function () {
    items = [new Item("foo", 0, 30)];
    update_quality();
    expect(items[0].quality).toEqual(28);
    expect(items[0].sell_in).toEqual(-1);
  });

  /* 
    Item Category: Conjured     
      - "Conjured" items degrade in Quality twice as fast as normal items
          change in qualtiy = 2X
*/

  it("should have Conjured item quality decrease by 2 when sell_in is equal to 10", function () {
    items = [new Item("Conjured", 10, 30)];
    update_quality();
    expect(items[0].quality).toEqual(28);
    expect(items[0].sell_in).toEqual(9);
  });

  it("should have Conjured item quality decrease to 0 when sell_in is equal to 10", function () {
    items = [new Item("Conjured", 10, 1)];
    update_quality();
    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(9);
  });

  it("should have Conjured item quality decrease by 4 when sell_in is equal to 0", function () {
    items = [new Item("Conjured", 0, 30)];
    update_quality();
    expect(items[0].quality).toEqual(26);
    expect(items[0].sell_in).toEqual(-1);
  });

  /* 
    Item Category: Aged Brie     
      - "Aged Brie" actually increases in Quality the older it gets
          date ~ sell by date ; quality increases
*/

  it("should have Aged Brie item quality increase by 1 when sell_in is equal to 10", function () {
    items = [new Item("Aged Brie", 10, 30)];
    update_quality();
    expect(items[0].quality).toEqual(31);
    expect(items[0].sell_in).toEqual(9);
  });

  it("should have Aged Brie item quality increase by 1 when sell_in is equal to 1", function () {
    items = [new Item("Aged Brie", 1, 30)];
    update_quality();
    expect(items[0].quality).toEqual(31);
    expect(items[0].sell_in).toEqual(0);
  });

  it("should have Aged Brie item quality increase by 1 when sell_in is equal to -1", function () {
    items = [new Item("Aged Brie", -1, 30)];
    update_quality();
    expect(items[0].quality).toEqual(32);
    expect(items[0].sell_in).toEqual(-2);
  });

  it("should not have Aged Brie item quality increase by 1 when when qualtiy is 50", function () {
    items = [new Item("Aged Brie", -1, 50)];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(-2);
  });

  it("should have Aged Brie quality not less than 0 and sell_in reduced by 1", function () {
    items = [new Item("foo", 10, 0)];
    update_quality();
    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(9);
  });

  /*
    Item Category: Backstage passes to a TAFKAL80ETC concert
      - Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but  
          date [(sell by date - 10), (sell by date - 5)] ; quality = quality + 2
          date [(sell by date - 5), sell by date] ; quality = quality + 3
      - Quality drops to 0 after the concert
          date > sell by date ; quality = 0
  */

  it("should have Backstage passes item quality equal to 0 when sell_in is equal to 0", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)];
    update_quality();
    expect(items[0].quality).toEqual(33);
    expect(items[0].sell_in).toEqual(-1);
  });

  it("should have Backstage passes item quality increase by 2 when sell_in is equal to 10", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30)];
    update_quality();
    expect(items[0].quality).toEqual(32);
    expect(items[0].sell_in).toEqual(9);
  });

  it("should have Backstage passes item quality increase by 2 when sell_in is less than 10 but greater than 5", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 30)];
    update_quality();
    expect(items[0].quality).toEqual(32);
    expect(items[0].sell_in).toEqual(5);
  });

  it("should have Backstage passes item quality increase to 50 when qualtiy is 49 sell_in is less than 10 but greater than 5", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 49)];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(5);
  });

  it("should not have Backstage passes item quality increase when qualtiy is 50 sell_in is less than 10 but greater than 5", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 50)];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(5);
  });

  it("should have Backstage passes item quality increase by 3 when sell_in is equal to 5", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30)];
    update_quality();
    expect(items[0].quality).toEqual(33);
    expect(items[0].sell_in).toEqual(4);
  });

  it("should have Backstage passes item quality increase by 3 when sell_in is less than 5", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 30)];
    update_quality();
    expect(items[0].quality).toEqual(33);
    expect(items[0].sell_in).toEqual(0);
  });

  it("should have Backstage passes item quality increase to 50 when when qualtiy is 48 sell_in is less than 5", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 48)];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(0);
  });

  it("should not have Backstage passes item quality increase by 3 when quality is 50 sell_in is less than 5", function () {
    items = [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)];
    update_quality();
    expect(items[0].quality).toEqual(50);
    expect(items[0].sell_in).toEqual(0);
  });

  it("should have Backstage passes quality not less than 0 and sell_in reduced by 1", function () {
    items = [new Item("foo", 10, 0)];
    update_quality();
    expect(items[0].quality).toEqual(0);
    expect(items[0].sell_in).toEqual(9);
  });

  /*
    Item Category: Sulfuras, Hand of Ragnaros
      - Legendary Item - no change in Quality and never sells
  */

  it("should have Sulfuras item quality and sell_in not change", function () {
    items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)];
    update_quality();
    expect(items[0].quality).toEqual(80);
    expect(items[0].sell_in).toEqual(10);
  });

  it("should have Sulfuras item quality and sell_in not change", function () {
    items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    update_quality();
    expect(items[0].quality).toEqual(80);
    expect(items[0].sell_in).toEqual(0);
  });
});
