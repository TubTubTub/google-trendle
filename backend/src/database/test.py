import sqlalchemy as sa

DATABASE_URL = 'postgresql://test:testpassword@localhost:5432/google_trendle'

engine = sa.create_engine(url=DATABASE_URL)
metadata_obj = sa.MetaData()

testTable = sa.Table(
    'test',
    metadata_obj,
    sa.Column('col1', sa.String, primary_key=True),
    sa.Column('col2', sa.Integer)
)

metadata_obj.create_all(engine)