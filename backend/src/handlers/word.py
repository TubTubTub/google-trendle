import os
import random


class Word:
    @staticmethod
    def get_random_word():
        path = os.path.join(os.path.dirname(__file__), '../assets/google-10000-english.txt')

        # pylint: disable=unspecified-encoding
        with open(path, 'r') as file:
            line = next(file)

            for num, line in enumerate(file, 2):
                if random.randrange(num):
                    continue
                result = line

            return str(result.strip())