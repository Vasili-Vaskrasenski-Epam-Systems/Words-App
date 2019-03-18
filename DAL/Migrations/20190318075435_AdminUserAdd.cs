using System;
using Entities.Enums;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AdminUserAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(table: "Users",
                columns: new[] { "Id", "Name", "Password", "UserType" },
                values: new Object[] { Guid.NewGuid(), "admin", "admin1", (int)UserType.Administrator });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
