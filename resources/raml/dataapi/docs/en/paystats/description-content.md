This document describes the data services specifications for the PayStats API


This API provides statistical data that has been obtained through transactions made with BBVA debit and credit cards in Spanish retail stores  from January 1st, 2014 and will be updated weekly, for data grouped by day and week, and updated monthly for data grouped by month. This information is structured in 2  levels based on geographical area zipcodes and tiles.

Most of them share some common parameters

- URL: path to API endpoint

- PAGE: page number (pagination)

- PAGE_SIZE: number of elements per page (pagination)

- DATE_MIN: the earliest date to be retrieved. Statistics returned by this request will be bounded by this parameter and date_max, both inclusive. Format YYYY or YYYYMM or YYYYMMDD, where YYYY is year with 4 digits, MM is month of year with 2 digits and DD is day of months with 2 digits. If you enter only a year YYYY and select group_by month or week, the API autocompletes the date to first month of the year (eg 2014 to 201401), and in the case you select group_by day, the API autocompletes the date to first day of month of this year (eg 2014 to 20140101, 201401 to 20140101)

- DATE_MAX: the most recent  date for which we want to obtain the data. Format YYYY or YYYYMM or YYYYMMDD, where YYYY is year with 4 digits, MM is month of year with 2 digits and DD is day of months with 2 digits. If you enter only a year YYYY and select group_by month or week, the API autocompletes the date to first month of the year (eg 2014 to 201401), and in the case you select group_by day, the API autocompletes date to first day of month of this year (eg 2014 to 20140101, 201401 to 20140101 )

- GROUP_BY: time grouping (aggregation) (month, week and day). Caution group_by may override you date range defined by date_min/date_max. If you choose a group_by parameter that is a longer time period than the date range specified by the date_min and date_max parameters you will get the whole time period specified by the grouping. For example if you specify date_min=20140118, date_max=20140131, but group_by=month the data returned will be the whole month of January not just the partial range specified

If the number of transactions which returns the request is not enough, to ensure data anonymity, no data will be displayed.

There is another group of services (info) that provides information about data used by the API and how to properly use API.

Specific information about each service can be found in the corresponding sections.
