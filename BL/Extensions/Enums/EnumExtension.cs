using System;

namespace BL.Extensions.Enums
{
    public class EnumExtension
    {
        public static T GetEnumByStringValue<T>(string value) where T : struct 
        {
            if (!typeof(T).IsEnum)
            {
                throw new ArgumentException("This extension only for enums");
            }
            return (T)Enum.Parse(typeof(T), value);
        }
    }
}
