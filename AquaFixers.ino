#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// -- LCD Configuration
LiquidCrystal_I2C lcd(0x27, 16, 2);

// -- Wi-Fi Credentials
const char* ssid = "Reya02";
const char* password = "0138095221@tmk";

// -- Firebase Project Credentials
#define API_KEY "AIzaSyBDlJw_vduk8859AlbROe2ZC3QHiJ_Effc"
#define FIREBASE_PROJECT_ID "synapse-learn"
#define DATABASE_URL "https://synapse-learn-default-rtdb.firebaseio.com/"

// -- Firebase Objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// -- Firestore Document Path
String documentPath = "sensorData/levels";

// -- Sensor Pin Definitions
const int RAINWATER_SENSOR_PIN = 33; // ADC1_CH5
const int RIVER_WATER_SENSOR_PIN = 32; // ADC1_CH4

void setup() {
  Serial.begin(115200);
  Serial.println();

  // -- Initialize LCD
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("AquaFixers");
  lcd.setCursor(0, 1);
  lcd.print("Connecting...");

  // -- Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi Connected");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
  delay(2000);

  // -- Firebase Setup
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email = "user@example.com";
  auth.user.password = "password";
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // -- Read water levels from sensors
  int rainwaterLevel = analogRead(RAINWATER_SENSOR_PIN);
  int riverWaterLevel = analogRead(RIVER_WATER_SENSOR_PIN);

  // -- Print to Serial Monitor
  Serial.print("Rainwater Level: ");
  Serial.println(rainwaterLevel);
  Serial.print("River Water Level: ");
  Serial.println(riverWaterLevel);

  // -- Display on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Rain: ");
  lcd.print(rainwaterLevel);
  lcd.setCursor(0, 1);
  lcd.print("River: ");
  lcd.print(riverWaterLevel);

  // -- Send sensor data to Firestore
  if (Firebase.ready()) {
    FirebaseJson content;
    content.set("fields/rainwaterLevel/integerValue", String(rainwaterLevel));
    content.set("fields/riverWaterLevel/integerValue", String(riverWaterLevel));
    if (Firebase.Firestore.patchDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), content.raw(), "rainwaterLevel,riverWaterLevel")) {
      Serial.println("Data sent to Firebase successfully.");
      Serial.println(fbdo.payload());
    } else {
      Serial.println("Error sending data to Firebase.");
      Serial.println(fbdo.errorReason());
    }
  }

  // -- Delay before next reading
  delay(5000); // Check every 5 seconds
}