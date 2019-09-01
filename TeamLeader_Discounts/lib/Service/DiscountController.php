<?php

class DiscountController {
    //discountArray keeps the discount for each product
    private $discountArray = Array();
    private $arr_cat1 = Array();
    private $arr_disc3 = Array();
    private $amount_of_items;
    private $total_discount = 0;
    private $productController;

    /**
     * DiscountController constructor.
     * @param $order_items
     */
    public function __construct($order_items,$productController)
    {
        $this->setDiscountArray($order_items);
        $this->amount_of_items = sizeof($this->discountArray);

        $this->productController = $productController;
    }

    /**
     * @return array
     */
    public function getDiscountArray()
    {
        return $this->discountArray;
    }

    /**
     * @param mixed $order_items
     */
    public function setDiscountArray($order_items): void
    {
        foreach ($order_items as $item) {
            //var_dump($item);

            $product_id = $item['product-id'];
            $quantity = $item['quantity'];
            $unit_price = $item['unit-price'];

            //var_dump($product_id,$quantity,$unit_price);

            for ($i=0; $i<$quantity; $i++) {
                $discount_item['product-id'] = $product_id;
                $discount_item['unit-price'] = $unit_price;
                $discount_item['product-discount'] = "0";

                //var_dump($discount_item);

                array_push($this->discountArray,$discount_item);
            }
        }
        //var_dump($this->discountArray);
    }

    public function setDiscount1($revenue) {
        if ($revenue > 1000) {
            echo "You'll get a discount of 10% on all products that don't have a discount yet";

            //add discount of 0.1*price where discount is still 0
            for ($j=0; $j<$this->amount_of_items; $j++) {
                if ( $this->discountArray[$j]['product-discount'] == 0 ) {
                    $discount = 0.1 * $this->discountArray[$j]['unit-price'];
                    $this->discountArray[$j]['product-discount'] = round($discount, 2);
                }
            }
        }
    }

    public function setDiscount2($n,$prod_id,$unit_price) {
        for ($i=0; $i<$n; $i++) {
            $discount = $unit_price;
            $this->setDiscount($prod_id,$discount);
        }
    }

    public function setDiscount3 () {
        //save products that should have discount 3
        $this->setDisc3Array();

        $quantity_disc3 = sizeof($this->arr_disc3);
        for ($j=0; $j<$quantity_disc3; $j++) {
            $prod_id = $this->arr_disc3[$j]['product-id'];
            $unit_price = $this->arr_disc3[$j]['unit-price'];
            $discount = 0.2 * $unit_price;

            $this->setDiscount($prod_id,$discount);
        }
    }

    public function setDiscount ($prod_id,$discount) {
        for ($j=0; $j<$this->amount_of_items; $j++) {
            if (
                $this->discountArray[$j]['product-id'] == $prod_id
                && $this->discountArray[$j]['product-discount'] == 0
            ) {
                $this->discountArray[$j]['product-discount'] = round($discount, 2);
                $j=$this->amount_of_items;
            }
        }
    }

    public function setTotalDiscount () {
        for ($j=0; $j<$this->amount_of_items; $j++) {
            $this->total_discount += $this->discountArray[$j]['product-discount'];
        }
    }

    public function getTotalDiscount () {
        return $this->total_discount;
    }

    // --- extra functions for discount 2 ---------------------------------

    /**
     * saves all prices of products category 1
     */
    public function setCat1Array($quantity, $unit_price) {
        for ($i=0; $i<$quantity; $i++) {
            array_push($this->arr_cat1, $unit_price);
        }
    }

    /**
     * saves id&price of products that should have a discount 3
     */
    public function setDisc3Array() {
        $quantity_cat1 = sizeof($this->arr_cat1);
        $quantity_discount3 = floor($quantity_cat1/2);
        echo "You have: " . $quantity_cat1 . " product(s) of cat1\r\n";
        echo "You have 20% discount on " . $quantity_discount3 . " item(s).\r\n";

        for ($i=0; $i<$quantity_discount3; $i++) {
            //find lowest price in arr_cat1
            $lowest_price = min($this->arr_cat1);
            //find index of this price
            $index = array_search($lowest_price, $this->arr_cat1);
            //delete value for calculating 2nd lowest price
            unset($this->arr_cat1[$index]);

            //get product id of lowest price
            $prod_id = $this->productController->getProductIDOfPrice($lowest_price);
            //save price & id of discount product in array
            $discount_item['product-id'] = $prod_id;
            $discount_item['unit-price'] = $lowest_price;
            array_push($this->arr_disc3,$discount_item);

        }

    }


}