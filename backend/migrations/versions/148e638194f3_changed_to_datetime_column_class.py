"""changed to datetime column class

Revision ID: 148e638194f3
Revises: ad2fa7be507d
Create Date: 2024-11-10 14:28:06.447029

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '148e638194f3'
down_revision = 'ad2fa7be507d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_word', schema=None) as batch_op:
        batch_op.alter_column('updated_dt',
               existing_type=sa.VARCHAR(length=64),
               type_=sa.DateTime(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user_word', schema=None) as batch_op:
        batch_op.alter_column('updated_dt',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=64),
               existing_nullable=False)

    # ### end Alembic commands ###
