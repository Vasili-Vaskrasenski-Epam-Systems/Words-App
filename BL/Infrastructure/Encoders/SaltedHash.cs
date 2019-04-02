using System;
using System.Security.Cryptography;

namespace BL.Infrastructure.Encoders
{
    public class SaltedHash
    {
        private static readonly string _salt;

        static SaltedHash()
        {
            _salt = "CFRezTbd90LlnpomHDa2bvYbTaZ+T9HTDmEg7ImdsKCvVbeS8DnQZBf2";
        }

        public static string ComputeHash(string password)
        {
            var saltBytes = Convert.FromBase64String(_salt);
            using (var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 1000))
                return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));
        }

        public static bool Verify(string hash, string password)
        {
            return hash == ComputeHash(password);
        }
    }
}
