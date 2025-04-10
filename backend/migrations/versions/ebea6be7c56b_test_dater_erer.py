"""test dater erer

Revision ID: ebea6be7c56b
Revises: e0113844ba66
Create Date: 2024-11-10 14:39:45.225999

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebea6be7c56b'
down_revision = 'e0113844ba66'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('test',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user_word', schema=None) as batch_op:
        batch_op.drop_column('updated_dt')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_word', schema=None) as batch_op:
        batch_op.add_column(sa.Column('updated_dt', sa.VARCHAR(length=64), autoincrement=False, nullable=False))

    op.drop_table('test')
    # ### end Alembic commands ###
