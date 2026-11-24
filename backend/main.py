from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Literal

from data import menu_items, orders


app = FastAPI(title="TiffinDesk API")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -------------------------
# REQUEST MODELS
# -------------------------

class MenuCreate(BaseModel):
    name: str = Field(min_length=2)
    price: float = Field(gt=0)
    category: str


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=2)
    menu_item_id: int
    quantity: int = Field(gt=0)


class StatusUpdate(BaseModel):
    status: Literal["Pending", "Preparing", "Completed"]


# -------------------------
# 1. DASHBOARD API
# -------------------------

@app.get("/dashboard/stats")
def get_dashboard_stats():

    return {
        "total_menu_items": len(menu_items),
        "total_orders": len(orders),
        "pending_orders": sum(
            1 for order in orders if order["status"] == "Pending"
        ),
        "completed_orders": sum(
            1 for order in orders if order["status"] == "Completed"
        )
    }


# -------------------------
# 2. MENU APIs
# -------------------------

# GET all menu items
@app.get("/menu")
def get_menu():

    return menu_items


# GET one menu item
@app.get("/menu/{item_id}")
def get_menu_item(item_id: int):

    for item in menu_items:
        if item["id"] == item_id:
            return item

    raise HTTPException(status_code=404, detail="Food item not found")


# POST - Add menu item
@app.post("/menu")
def create_menu_item(item: MenuCreate):

    new_item = {
        "id": max((x["id"] for x in menu_items), default=0) + 1,
        "name": item.name,
        "price": item.price,
        "category": item.category
    }

    menu_items.append(new_item)

    return {
        "message": "Food item added successfully",
        "item": new_item
    }


# PUT - Update menu item
@app.put("/menu/{item_id}")
def update_menu_item(item_id: int, updated_item: MenuCreate):

    for item in menu_items:
        if item["id"] == item_id:

            item["name"] = updated_item.name
            item["price"] = updated_item.price
            item["category"] = updated_item.category

            return {
                "message": "Food item updated successfully",
                "item": item
            }

    raise HTTPException(status_code=404, detail="Food item not found")


# DELETE - Delete menu item
@app.delete("/menu/{item_id}")
def delete_menu_item(item_id: int):

    for item in menu_items:
        if item["id"] == item_id:

            menu_items.remove(item)

            return {"message": "Food item deleted successfully"}

    raise HTTPException(status_code=404, detail="Food item not found")


# -------------------------
# 3. ORDER APIs
# -------------------------

# GET all orders
@app.get("/orders")
def get_orders():

    return orders


# GET one order
@app.get("/orders/{order_id}")
def get_order(order_id: int):

    for order in orders:
        if order["id"] == order_id:
            return order

    raise HTTPException(status_code=404, detail="Order not found")


# POST - Create order
@app.post("/orders")
def create_order(order: OrderCreate):

    food = None

    for item in menu_items:
        if item["id"] == order.menu_item_id:
            food = item
            break

    if food is None:
        raise HTTPException(status_code=404, detail="Food item not found")

    new_order = {
        "id": max((x["id"] for x in orders), default=0) + 1,
        "customer_name": order.customer_name,
        "menu_item_id": food["id"],
        "food_name": food["name"],
        "quantity": order.quantity,
        "total_amount": food["price"] * order.quantity,
        "status": "Pending"
    }

    orders.append(new_order)

    return {
        "message": "Order created successfully",
        "order": new_order
    }


# PATCH - Update order status
@app.patch("/orders/{order_id}/status")
def update_order_status(order_id: int, update: StatusUpdate):

    for order in orders:
        if order["id"] == order_id:

            order["status"] = update.status

            return {
                "message": "Order status updated successfully",
                "order": order
            }

    raise HTTPException(status_code=404, detail="Order not found")


# DELETE - Delete order
@app.delete("/orders/{order_id}")
def delete_order(order_id: int):

    for order in orders:
        if order["id"] == order_id:

            orders.remove(order)

            return {"message": "Order deleted successfully"}

    raise HTTPException(status_code=404, detail="Order not found")