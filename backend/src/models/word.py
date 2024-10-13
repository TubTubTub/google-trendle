import random
import os

class Word:
    @staticmethod
    def get_random_word():
        path = os.path.join(os.path.dirname(__file__), '../unix_word_list.txt')

        with open(path, 'r') as file:
            line = next(file)

            for num, line in enumerate(file, 2):
                if random.randrange(num):
                    continue
                result = line
            
            return result