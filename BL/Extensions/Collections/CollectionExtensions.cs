using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BL.Extensions.Collections
{
    public static class CollectionExtensions
    {
        public static bool ExistAndNotEmpty<T>(this IEnumerable<T> collection)
        {
            return collection != null && collection.Any();
        }
    }
}
