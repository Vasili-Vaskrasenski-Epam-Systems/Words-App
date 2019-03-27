using System;

namespace Configuration
{
    public class Config
    {
        public static string WordsDbConnectionStringName;

        static Config()
        {
            WordsDbConnectionStringName = "WordsDbConnectionString";
        }

        public class JwtConstants
        {
            public static string AuthenticationKey;
            public static string SchemaName;
            public static string ValidIssuerName;
            public static string ValidAudienceName;
            public static string AccessTokenExpirationMinutes;
            public static string RefreshTokenExpirationMinutes;
            static JwtConstants()
            {
                AuthenticationKey = "JwtKey";
                SchemaName = "JwtSchemaName";
                ValidIssuerName = "JwtIssuerName";
                ValidAudienceName = "JwtAudienceName";
                AccessTokenExpirationMinutes = "JwtAccessKeyExpirationMinutes";
                RefreshTokenExpirationMinutes = "JwtRefreshKeyExpirationMinutes";
            }
        }
    }
}
