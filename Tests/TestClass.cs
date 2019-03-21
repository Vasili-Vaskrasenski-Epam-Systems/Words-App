using System;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class TestClass
    {
        [Test]
        public void MainTest()
        {
            var date = DateTime.UtcNow.AddDays(1);

            var anotherDate = DateTime.UtcNow;

            var a = date.Date;

            Assert.IsTrue(date.Date > anotherDate.Date);
        }
    }
}
