import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '../', '../'))
from src import Test, sa
from sqlalchemy import text

def add_data(text):
    test = Test(random=text)
    sa.session.add(test)
    sa.session.commit()

def print_data():
    for record in sa.session.execute(text('SELECT * FROM test;')):
        print(record)

def delete():
    sa.session.query(Test).delete()
    sa.session.commit()

add_data(text='bruh')
print_data()
delete()
print_data()