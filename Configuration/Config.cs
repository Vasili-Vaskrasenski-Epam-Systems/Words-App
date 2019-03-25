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
            static JwtConstants()
            {
                AuthenticationKey = "0d5b3235a8b403c3dab9c3f4f65c07fcalskd234n1k41230";
                SchemaName = "JwtBearer";
                ValidIssuerName = "WordApplication";
                ValidAudienceName = "WordApplicationClients";
            }
        }
    }
}
