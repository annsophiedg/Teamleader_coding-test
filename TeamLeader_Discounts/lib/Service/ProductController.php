<?php

class ProductController {

    private $products;

    /**
     * DiscountController constructor.
     */
    public function __construct($products)
    {
        $this->products = json_decode($products,true);
    }

    /**
     * @return string
     */
    public function getProductCategory($id)
    {
        foreach ($this->products as $p) {
            if ($p['id'] == $id) {
                return $p['category'];
            }
        }
    }

    /**
     * @return string
     */
    public function getProductPrice($id)
    {
        foreach ($this->products as $p) {
            if ($p['id'] == $id) {
                return $p['price'];
            }
        }
    }

    /**
     * RETURNS FIRST ID OF PRODUCTS WITH THIS PRICE
     * now only used to calculate discount 3
     * so it doesn't matter which ID has the discount if 2 products have the same price
     *
     * @return string
     */
    public function getProductIDOfPrice($unit_price)
    {
        foreach ($this->products as $p) {
            if ($p['price'] == $unit_price) {
                return $p['id'];
            }
        }
    }

}