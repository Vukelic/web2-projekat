using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class ijoj : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gold",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "RentAir",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "Silver",
                table: "Discounts");

            migrationBuilder.AddColumn<double>(
                name: "GoldD",
                table: "Discounts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "RentAirD",
                table: "Discounts",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SilverD",
                table: "Discounts",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoldD",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "RentAirD",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "SilverD",
                table: "Discounts");

            migrationBuilder.AddColumn<double>(
                name: "Gold",
                table: "Discounts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "RentAir",
                table: "Discounts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Silver",
                table: "Discounts",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
