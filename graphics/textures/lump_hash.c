#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>

unsigned int W_HashLumpName(const char* str)
{
    unsigned int hash = 1315423911;
    unsigned int i    = 0;

    for(i = 0; i < 8 && *str != '\0'; str++, i++)
    {
        char letter = toupper((int)*str);
        hash ^= ((hash << 5) + letter + (hash >> 2));
    }

    return hash;
}

unsigned int reverse_stupid_hash()
{
    return 0;
}

int main(int argc, char **argv)
{
    if (argc != 2)
    {
        printf("Usage: lump_hash <name>\n");
        return EXIT_FAILURE;
    }

    int a = W_HashLumpName(argv[1]) % 65536;
    printf("Hash: %d\n", a);

    return EXIT_SUCCESS;
}