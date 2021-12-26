# 26-12-2021-PulkitBajaj

### START the project by running
```
npm start
```
### POST REQUEST => /api
* Json data of patients will be passed to the api as an array
* Format for data is as given:
sample data: 
[{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, {"Gender": "Male", "HeightCm": 161,
"WeightKg":85 }, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, { "Gender": "Female",
"HeightCm": 166,"WeightKg": 62}, {"Gender": "Female", "HeightCm": 150, "WeightKg": 70},
{"Gender": "Female","HeightCm": 167, "WeightKg": 82}]

### RESPONSE
* json object will be returned 
* sample response :
{
    "updatedData": [
        {
            "Gender": "Male",
            "HeightCm": 178,
            "WeightKg": 58,
            "BMI": "18.31 kg/m2",
            "BMICateogry": "Underweight",
            "HealthRisk": "Malnutrition risk"
        },
        {
            "Gender": "Male",
            "HeightCm": 180,
            "WeightKg": 77,
            "BMI": "23.77 kg/m2",
            "BMICateogry": "Normal weight",
            "HealthRisk": "Low risk"
        },
        {
            "Gender": "Female",
            "HeightCm": 167,
            "WeightKg": 82,
            "BMI": "29.4 kg/m2",
            "BMICateogry": "Overweight",
            "HealthRisk": "Enhanced risk"
        },
        {
            "Gender": "Male",
            "HeightCm": 167,
            "WeightKg": 96,
            "BMI": "34.42 kg/m2",
            "BMICateogry": "Moderately obese",
            "HealthRisk": "Medium risk"
        },
        {
            "Gender": "Female",
            "HeightCm": 167,
            "WeightKg": 100,
            "BMI": "35.86 kg/m2",
            "BMICateogry": "Severel obese",
            "HealthRisk": "High"
        }
    ],
    "totalNumberOfOverweightPeople": 1
}
* response contains 2 fields: {updatedData, totalNumberOfOverweightPeople}
* updatedData is array contaning original fields appended with 3 new fields (BMI, BMICategory, HealthRisk)

### TestCases
test-cases can be run by using command
```
npm test
```
#### following testcases are added
    ✔ should retain count of the records passed
    ✔ should give correct category of people
    ✔ should give unknown values if height or weight is 0
    ✔ should give unknown values if height or weight is missing
    ✔ should handle large records (1 lakh)
    
