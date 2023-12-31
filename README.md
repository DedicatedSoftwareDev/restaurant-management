# Restaurant Order Management Web App
Built with VueJS, Vuex, socket-io, and tailwindcss

# Screenshots
Notifications
![Notifcations](/screenshots/Notifications.png?raw=true)

Order Detail
![Order Detail](/screenshots/OrderDetail.png?raw=true)

Take manual action on an order
![Order Detail](/screenshots/OrderDetail_DropDown.png?raw=true)

Filtered order view
![Filtered order view](/screenshots/FilteredOrders.png?raw=true)

Restaurant Performance
Take manual action on an order
![Restaurant performance](/screenshots/Performance_Data.png?raw=true)


## Technology reasoning
- VueJS for reusable component design paradigm
- Vuex for a global state container (following flux architecture)
- socket-io to communicate real-time orders (vue-socket.io for it's tight integration with vuex)
- tailwindcss to build a custom design system that isn't the same as every other website on the internet (i.e. Bootstrap)


# Steps to run project
## 1. Get Mapbox API key and add to .env file like so
In the .env file, replace `YOUR_ACCESS_TOKEN` with your mapbox access token, which you can create for free at mapbox.com.

**Order Detail view will not show a map view if you don't have this setup.**
```
VUE_APP_MAPBOX_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```

## 2. Install Dependencies
```
npm install
```

## 3. Run simulation
```
npm run simulation
```



# Design Decisions
BE sends the following payload signature for each order:
```
{
  destination: "801 Toyopa Dr, Pacific Palisades, CA 90272",
  event_name: "CREATED",
  id: "4b76edbf",
  name: "Cheese pizza",
  sent_at_second: 4
},
```

Orders are stored in a global state container, following flux design patterns, specifically using Vuex. I chose to use npm package `vue-socket.io` to listen to socket-io events. I use `vue-socket.io` to listen for `new_event` emitted from socket-io at port 3000. `SOCKET_new_event` mutation processes the event.

On the FE I store orders like so:
```
{
  destination: "801 Toyopa Dr, Pacific Palisades, CA 90272",
  event_name: "CREATED",
  id: "4b76edbf",
  name: "Cheese pizza",
  sent_at_second: 4,

  currentStatus: String, // new event status,
  events: {
    EVENT_NAME: { new_event_payload }
  }
},

```
- Because there are only 5 possible `event_name` (`CREATED`, `COOKED`, `DRIVER_RECEIVED`, `DELIVERED`, and `CANCELLED`), I chose to store each new event in an `events {}` (instead of in an array). This gives me instant O(1) access to whichever order event I'm looking for. For example, if I want to know when an event was delivered, in any component I can simply do `order.events.DELIVERED` directly in any component without having to lookup within an array of events. The one downside of this approach is we don't keep a good log of all events in the _order_ in which they are received. However, I do store a `sent_at_second` property when a user manually updates an order, so we *could* stitch together the order history in the correct order if such a request was made by Product & Design :) But at that point I would push for us to add a new api endpoint that fetches order history because we do not need the entire order history in most views.

## Views
### 1. Home
  - I built the home page as a dashboard with various modules that a restaurant owner would find most useful.
  - Notifications show the user orders (and order updates) as they are being received in real-time. This view can get overwhelming so I added the option to filter to only new orders, and additionally the option to close the notifications side bar.
  - The top row of filter options gives you a quick count of each filter and the number of items in that status currently. Clicking on any of these filters updates the orders you see right below.
  - I also add 3 sections at the bottom of the dashboard:
    - Best sellers: to see which ingredients are most popular
      - it's a simply word map count, I thought about pulling in a NLP library to categorize by food type (deserts, meals, and appetizers) or by culture (American, Italian, Middle Eastern) but time did not allow me to pursue this.
    - Time to delivery
      - a valuable metric for a restaurant owner is how long does it take for the restaurant to deliver items from the item of order. As a business owner he/she can help encourage their team/employees to track this value and improve over time.
    - Average order value
      - this seems like the most valuable information for the restaurant owner, but due to lack of $$$ data I just left this as a placeholder for future development.

### 2. Order Review
  - I started the entire project by building a dedicated `/orders/:id` page that can host information about any 1 order and can properly display all the relevant information. This page is routed to by clicking on a notification.



# If I had more time!
- Update BE to send minimal payloads when order status changes, all we need on FE is the `id` and `event_name` on a new status order, or if the order item itself is being changed we could simply send `{ id: ID, changes: { ... } }`. Right now we receive the entire `order` {}.
- Add better animations when order statuses change
- Show full order history (see discussion above)
  - Right now I assume most orders will transition between these 5 statuses: CREATED -> COOKED -> DRIVER_RECEIVED -> DELIVERED (with the option of it becoming CANCELLED at any point)
- Show in the dashboard at which point orders are being CANCELLED. If they've already been cooked or are en route, the restaurant is bleeding money, this is valuable information for restaurant owners to know.
- Add more thorough unit and e2e tests, specifically testing each component and various order status changes.
- Explore adding a FE state machine design pattern for each order.
- Use a NLP library to categorize food items by type of cuisine.


# Tests
### Run unit tests
```
npm run test:unit
```
