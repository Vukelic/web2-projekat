using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class carsupdatemodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "Img",
                table: "CarCompanies");

            migrationBuilder.AddColumn<string>(
                name: "ImagePic",
                table: "Cars",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImagePic",
                table: "CarCompanies",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePic",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "ImagePic",
                table: "CarCompanies");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "CarCompanies",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
