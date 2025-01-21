def individual_serial(predicitions) -> dict:
    return {
        "id": str(predictions['_id']),
        "date": predictions['date'],
        "prediction": predictions['prediction']
    }


def list_serial(predictions) -> list:
    return [individual_serial(predictions) for predictions in predictions]
