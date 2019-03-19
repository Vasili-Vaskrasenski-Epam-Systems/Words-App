using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class IsTranslationTask : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTranslation",
                table: "RelWordTasks");

            migrationBuilder.AddColumn<bool>(
                name: "IsTranslationTask",
                table: "WordTasks",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsTranslationTask",
                table: "WordTasks");

            migrationBuilder.AddColumn<bool>(
                name: "IsTranslation",
                table: "RelWordTasks",
                nullable: false,
                defaultValue: false);
        }
    }
}
