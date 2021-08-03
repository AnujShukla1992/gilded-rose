// Item class: DO NOT CHANGE!
function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

// Defining maximum value for Quality for the items
const QUALITY_MAX = 50;

// Upfront Declaration of item categories
const ITEM_CATEGORIES = {
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  BRIE: "Aged Brie",
  BACKSTAGE_PASSES: "Backstage passes to a TAFKAL80ETC concert",
  CONJURED: "Conjured",
};

let items = [];

const updateAgedBrieQuality = (item) =>
  item.sell_in < 0
    ? (item.quality = Math.min(item.quality + 2, QUALITY_MAX))
    : (item.quality = Math.min(item.quality + 1, QUALITY_MAX));

const updateBackstagePasses = (item) => {
  // reducing the sell_in beforehand to avoid redundancy
  item.sell_in = item.sell_in - 1;

  switch (true) {
    case item.sell_in < -1:
      item.quality = 0;
      break;
    case item.sell_in < 5:
      item.quality = Math.min(item.quality + 3, QUALITY_MAX);
      break;
    case item.sell_in < 10:
      item.quality = Math.min(item.quality + 2, QUALITY_MAX);
      break;
    default:
      item.quality = Math.min(item.quality + 1, QUALITY_MAX);
      break;
  }

  return item;
};

const reduceQualityAndSellIn = (item, reduceQualityBy) => {
  item.sell_in = item.sell_in - 1;
  item.quality =
    item.sell_in < 0
      ? Math.max(Math.min(item.quality - reduceQualityBy * 2, 50), 0)
      : Math.max(Math.min(item.quality - reduceQualityBy, 50), 0);
  return item;
};

function update_quality() {
  // iterating through the list of items
  for (var i = 0; i < items.length; i++) {

    // switching to correct item category
    switch (items[i].name) {
      case ITEM_CATEGORIES.SULFURAS:
        // no change in case of Sulfuras
        break;
      case ITEM_CATEGORIES.BRIE:
        items[i].quality = updateAgedBrieQuality(items[i]);
        items[i].sell_in = items[i].sell_in - 1;
        break;
      case ITEM_CATEGORIES.BACKSTAGE_PASSES:
        items[i] = updateBackstagePasses(items[i]);
        break;
      case ITEM_CATEGORIES.CONJURED:
        // Conjured item category has 2X reduction in quality
        items[i] = reduceQualityAndSellIn(items[i], 2);
        break;
      default:
        items[i] = reduceQualityAndSellIn(items[i], 1);
        break;
    }
  }
}
