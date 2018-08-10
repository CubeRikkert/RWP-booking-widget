# Real world project made for salonized.com.
A booking widget which connects to salonized's api to make bookings.

Some cool features of the widget are: 

Dynamic dropdowns: First 3 dropdowns are dynamic, meaning that their content is dynamically updated according to what's been selected in the other 2. For example, if a salon is selected, only the employees of that salon are visible in the related dropdown. So, are the services that are given for that salon. 

Searchabe dropdowns: The dropdowns are also searchable. So, if the list is too long, instead of scrolling, the user can type and see only the results which include what's being typed.

Multiselection: There's a multi-selection feature which allows salons to offer multiple services at a time. 

Automatic selection: Based on user's selection, if there's only 1 availability in any of the other dropdowns, this selection is made automatically. 

No preference: If the user has no preference (if she wants her hair to be cut but doesn't care who'll cut it) , there's a "no preference" selection appears in the list, which, when selected, randomly assigns the task to an available employee.

Disabled dates: In the second screen, only the dates that are available for that employee and service are clickable. 

To install the app: clone/download the folder. In terminal, go to that folder and yarn install (the dependencies). Then yarn start to start the application.

<img src="https://github.com/alperkay/booking-widget-salonized/blob/master/2018-08-08%2010.39.02.gif" width="800" />