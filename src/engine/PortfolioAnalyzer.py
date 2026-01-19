import openai
import json

class PortfolioAnalyzer:
    """
    Core Engine: Transforms raw project data into a strategic career asset.
    """
    def __init__(self, api_key):
        self.client = openai.OpenAI(api_key=api_key)

    def generate_strategic_narrative(self, project_data, target_role):
        """
        Reframes a project to align with a specific target role.
        """
        prompt = f"""
        Role: Senior Career Strategist
        Context: Transform the following project description into a strategic narrative for a '{target_role}' position.
        Focus on: Problem, Action, Result (PAR) and specific impact.
        
        Raw Data: {json.dumps(project_data)}
        """
        
        response = self.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "system", "content": "You are a world-class career consultant."},
                      {"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    def identify_skill_gaps(self, portfolio_skills, market_trends):
        """
        Compares user skills against real-time market trends.
        """
        # Logic to calculate delta between current portfolio and market requirements
        gap_analysis = [skill for skill in market_trends if skill not in portfolio_skills]
        return {
            "status": "Analysis Complete",
            "missing_high_value_skills": gap_analysis[:5],
            "recommendation": "Consider adding a project demonstrating " + gap_analysis[0] if gap_analysis else "Portfolio is market-aligned."
        }

# Example Usage
# analyzer = PortfolioAnalyzer(api_key="sk-...")
# narrative = analyzer.generate_strategic_narrative({"title": "Web App", "tools": "React"}, "Senior Frontend Engineer")