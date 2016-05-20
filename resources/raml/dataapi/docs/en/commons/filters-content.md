The API has filtering algorithms for preventing any entity identification.

Response data may be filtered at different levels:

  - If the first data level contains sensitive information it is filtered and the API only returns the date.

    Example:

      ``` javascript
      {
        "result": {
          "code": 200,
          "info": "OK"
        },
        "data": [
          {
            "date": "201310"
          }
        ]
      }
      ```

  - If the second or third data level contain sensitive information it is filtered and not displayed.

    Example:

      ``` javascript
      {
        "result": {
          "code": 200,
          "info": "OK"
        },
        "data": {
          "stats": [
            {
              "date": "201401"
            },
            {
              "date": "201402",
              "merchants": 18,
              "cards": 128,
              "txs": 148,
              "zipcodes": [
                {
                  "label": "28913",
                  "cards": 25,
                  "txs": 33,
                  "incomes": 9113.72
                }
              ]
            },
            {
              "date": "201403",
              "merchants": 18,
              "cards": 96,
              "txs": 104,
              "zipcodes": [
                {
                  "label": "28913",
                  "cards": 23,
                  "txs": 27,
                  "incomes": 7010.4
                },
                {
                  "label": "28919",
                  "cards": 3,
                  "txs": 3,
                  "incomes": 1367.35
                },
                {
                  "label": "28915",
                  "cards": 3,
                  "txs": 3,
                  "incomes": 564.9
                }
              ]
            }
          ]
        }
      }
      ```
