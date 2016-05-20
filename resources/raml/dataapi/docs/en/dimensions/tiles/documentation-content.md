Through these services it is possible to obtain basic statistics by tiles:

- LONGITUDE and LATITUDE are the parameters that control the placement of the geographic tiles

- LONGITUDE and LATITUDE are rounded to the third significant digit, but the third significant digit will be rounded to 0 or 5. For example: 40.336 to 40.335, 40.311 to 40.310, etc

- To calculate statistics by tiles, all of Spain has been split in 500 x 500 meters quadrants. LONGITUDE and LATITUDE indicate the central point of each quadrant.


![Tiles](https://s3-eu-west-1.amazonaws.com/apidatos-dev-static/images_raml/tiles_small.png)

Likewise, one possible time / duration aggregation level is offered:

  - Statistics by year, identified by the group type: 'year'.

  - Statistics by month, identified by the group type: 'month'.

  - Statistics by week, identified by the group type: 'week'.

  - Statistics by day, identified by the group type: 'day'.

List of tiles (CSV file) that offers the API
[(Download)](https://s3-eu-west-1.amazonaws.com/apidatos-dev-static/resources_raml/tiles_paystats.csv)

Specific information about each service can be found in the corresponding section.
