using System;
using DAL.Helpers;
using Entities.Enums;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class TestClass
    {
        [Test]
        public void MainTest()
        {
            var pswd = Encrypters.Encrypt("Application-Admin_1");
        }
    }
}
