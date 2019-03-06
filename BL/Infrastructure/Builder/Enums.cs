namespace BL.Infrastructure.Builder
{
    public enum ExpressionKey
    {
        Unknown = 0,
        And = 1,
        Or = 2,
    }

    public enum ExpressionMethod
    {
        Unknown = 0,
        NotEqual = 1,
        Equal = 2,
        GreaterOrEqual = 3,
        Greater = 4,
        Lesser = 5,
        LesserOrEqual = 6,
        Contains = 7,
    }
}
