using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class VerbAnswer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Answer",
                table: "VerbAnswers",
                newName: "ThirdForm");

            migrationBuilder.AddColumn<string>(
                name: "FirstForm",
                table: "VerbAnswers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondForm",
                table: "VerbAnswers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstForm",
                table: "VerbAnswers");

            migrationBuilder.DropColumn(
                name: "SecondForm",
                table: "VerbAnswers");

            migrationBuilder.RenameColumn(
                name: "ThirdForm",
                table: "VerbAnswers",
                newName: "Answer");
        }
    }
}
