# Server side

***To run your flask application run the following steps from the top folder in the repository:***

1. First, make sure you have a Python virtual environment created in your project folder. 
    
    ```
    python3 -m venv env
    ```
    
2. Then download all the required packages from the *requirements.txt* file.
    
    ```
    pip3 install -r requirements.txt
    ```
2. Make sure the application is running in the Python environment.

    ```
    . env/bin/activate
    ```

3. Export the server module

    ```
    export FLASK_APP=server
    ```

    For Windows use the command *'set'* instead of *'export'*.
    
4. Specify the desired running configuration. Chose one of the following configurations:
    
        1. DevelopmentConfig
        2. TestingConfig
        3. ProductionConfig
    
    For DevelopmentConfig and ProductionConfig, the deployed database is used. No other setup is needed.
    
    For TestingConfig you must have a local PostgreSQL database created with the following credentials:

        'user': 'test'
        'pw': 'test' 
        'db': 'test'
        'host': 'localhost'
        'port': '5432'
    
    Run the following command with your chosen configuration:
    
    ```
    export APP_SETTINGS=config.YourConfigurationChoice
    ```
    We recommend to run ```export FLASK_ENV=config.DevelopmentConfig``` as the server database should work from the get-go

5. Start the flask application.
    ```
    flask run
    ```
6. Open the web browser on: http://localhost:5000.

