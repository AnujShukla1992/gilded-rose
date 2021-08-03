# Requirements 

## Add new feature to sell new category of items
New item category: "Conjured"
- "Conjured" items degrade in Quality twice as fast as normal items 
    - Condition: 
        sell_in -1, quality - 2
        sell_in <= 0, quality - 2 * 2

# Existing state
  Item Categories:
  1. Aged Brie
  2. Backstage passes to a TAFKAL80ETC concert
  3. Sulfuras, Hand of Ragnaros

### Boundary Conditions
- All items have a SellIn value which denotes the number of days we have to sell the item
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

- Once the sell by date has passed, Quality degrades twice as fast
        Condition: sell_in <= 0 , quality - 2x

- The Quality of an item is never negative, The Quality of an item is never more than 50
        Condition: qulaity [0, 50]

- Aged Brie     
    - "Aged Brie" actually increases in Quality the older it gets
        Condition: sell_in -- ,  quality ++

- Backstage passes   
    - "Backstage passes", increases in Quality as its SellIn value approaches
        Condition: sell_in -- , quality ++
    - Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less and drops to 0 after the concert 
        Condition: 
            sell_in: [6, 10] , quality = quality + 2
            sell_in: (0, 5] , quality = quality + 3 (including the day of the concert)
            sell_in:  <=0 0 , quality = 0
- Sulfuras 
    - never has to be sold or decreases in Quality
    - Quality is 80 and it never alters.